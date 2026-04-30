"use client";
import React, { startTransition, useOptimistic, useState } from "react";
import { useForm } from "@tanstack/react-form";
import Image from "next/image";
import {
  useGetCountries,
  useGetUserFullProfile,
  useGetUserProfile,
} from "@/src/tanstack/useQuery";
import { useUpdateProfile } from "@/src/tanstack/useMutation";
import { Spinner } from "@/src/components/ui/spinner";
import {
  CameraIcon,
  Map,
  MessageSquareWarning,
  SearchIcon,
  User,
  XCircleIcon,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import FileUploader from "@/src/utils/fileUploader";
import { envVars } from "@/src/config/env";
import { toast } from "sonner";
import { updateProfileSchema } from "@/src/zod/zodValidation";
import { Field, FieldLabel } from "@/src/components/ui/field";
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxTrigger,
  ComboboxValue,
} from "@/src/components/ui/combobox";
import { SelectButton } from "@/src/components/ui/select";
import { useUserStore } from "@/src/store/zustand.store";

export default function ProfilePage() {
  const { isLoading } = useGetUserFullProfile();
  const userFullProfile = useUserStore((state) => state.userFullProfile);
  const [image, setImage] = useState<string>(userFullProfile?.avatar_url || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [resetForm, setResetForm] = useState<boolean>(false);
  const [, mutateOptimisticImage] = useOptimistic<string>(image);
  const [optimisticImageFile, mutateOptimisticImageFile] =
    useOptimistic<File | null>(imageFile);

  const { updateProfileMutate } = useUpdateProfile();
  const { userProfileRefetch } = useGetUserProfile();

  const [searchCountry, setSearchCountry] = useState<string>("");
  const { countries } = useGetCountries(searchCountry);

  const displayVisitedCountries = Array.isArray(
    userFullProfile?.visited_countries,
  )
    ? userFullProfile?.visited_countries.join(", ")
    : userFullProfile?.visited_countries || "";

  const travelInterests = Array.isArray(userFullProfile?.travel_interests)
    ? userFullProfile?.travel_interests
    : userFullProfile?.travel_interests ? [userFullProfile?.travel_interests] : [];

  const handleRemoveInterest = (interestToRemove: string) => {
    toast.loading("Removing interest...");
    const existing: string[] = Array.isArray(userFullProfile?.travel_interests) ? userFullProfile.travel_interests : [];
    const updatedInterests = existing.filter((i: string) => i !== interestToRemove);
    const interestsString = updatedInterests.length > 0 ? updatedInterests.join(", ") : "clear_all";

    updateProfileMutate({
      user_id: userFullProfile?.id || "",
      image: "",
      bio: "",
      travel_interests: interestsString,
      country: "",
      phone_number: "",
    });
  };

  const form = useForm({
    defaultValues: {
      bio: "",
      travel_interests: "",
      country: "",
      phone_number: "",
    },
    onSubmit: async ({ value }) => {
      const validateUpdate = updateProfileSchema.safeParse(value);

      if (
        !value.bio &&
        !value.travel_interests &&
        !value.country &&
        !value.phone_number
      ) {
        return toast.error("Please fill at least one field");
      }

      if (!validateUpdate.success) {
        const errors = validateUpdate.error.issues.map((item) => item.message);
        errors.forEach((msg) => {
          toast.error(msg);
        });
        return;
      }

      if (value.bio === userFullProfile?.bio) {
        return toast.error("You cannot add same bio");
      }

      const formData = new FormData();

      if (optimisticImageFile instanceof File) {
        formData.append("file", optimisticImageFile);
        formData.append("upload_preset", "travel_plan");
        formData.append("cloud_name", envVars.NEXT_PUBLIC_IMAGE_CLOUD_NAME);
      }
      try {
        let data = "";

        if (imageFile && optimisticImageFile) {
          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${envVars.NEXT_PUBLIC_IMAGE_CLOUD_NAME}/image/upload`,
            {
              method: "POST",
              body: formData,
            },
          );

          const url = await response.json();
          data = url.secure_url;

          if (!response.ok) {
            toast.dismiss();
            return toast.error(
              "Failed to upload image. Please try again later.",
            );
          }
        }

        const existingInterests: string[] = Array.isArray(userFullProfile?.travel_interests) ? userFullProfile.travel_interests : [];
        const newInterests = value.travel_interests ? value.travel_interests.split(",").map((i: string) => i.trim()).filter((i: string) => i) : [];
        
        const duplicate = newInterests.find((p: string) => existingInterests.includes(p));
        if (duplicate) {
          toast.dismiss();
          return toast.error(`Travel interest '${duplicate}' already exists`);
        }
        
        let mergedInterests = "";
        if (newInterests.length > 0) {
           mergedInterests = [...existingInterests, ...newInterests].join(", ");
        }

        updateProfileMutate({
          user_id: userFullProfile?.id || "",
          image: data || "",
          bio: value.bio,
          travel_interests: mergedInterests,
          country: value.country,
          phone_number: value.phone_number,
        });

        startTransition(() => {
          mutateOptimisticImage(data || "");
          setImageFile(null);
          setResetForm(true);
          mutateOptimisticImageFile(null);
        });
        userProfileRefetch();
        form.reset();
        return;
      } catch {
        toast.error("Something went wrong. Please try again later.");
        return;
      }
    },
  });

  return (
    <main className="max-w-4xl mx-auto px-6 pt-24 space-y-12 pb-12">
      {isLoading ? (
        <div className="h-screen">
          <Spinner className="w-fit mx-auto text-blue-600" />
        </div>
      ) : (
        <>
          <div className="flex flex-col">
            <h1 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight">
              Welcome back {userFullProfile?.full_name || "Unknown User"}
            </h1>
            <p className="text-on-surface-variant font-medium text-lg">
              Your next adventure awaits
            </p>
          </div>
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden ring-4 ring-surface-container-low shadow-xl relative">
            <CameraIcon className="absolute top-[80%] left-[80%] text-white stroke-amber-600 bg-yellow-50 rounded-full w-7 h-7 p-1" />
            <Image
              className="w-full h-full object-cover"
              loading="eager"
              data-alt="avatar"
              src={
                userFullProfile?.avatar_url ||
                "https://res.cloudinary.com/jingalahuhu69/image/upload/v1776234313/wzzrakohxs76t6qygogb.png"
              }
              alt="avatar"
              width={160}
              height={160}
            />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Personal Information */}
              <section className="bg-[#f3f1ed] rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-2">
                  <User className="text-primary" />
                  <h3 className="text-lg font-bold">Personal Information</h3>
                </div>

                <div className="space-y-5">
                  {/* Full Name - Non Editable */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant px-1">
                      Full Name
                    </label>
                    <input
                      className="bg-[#dde3dc] w-full bg-surface-container-highest border-none rounded-xl p-4 opacity-70 cursor-not-allowed"
                      type="text"
                      value={userFullProfile?.full_name || ""}
                      disabled
                      readOnly
                    />
                  </div>

                  {/* Phone Number */}
                  {!userFullProfile?.phone && (
                    <div>
                      <p className="text-red-500 flex gap-2">
                        <MessageSquareWarning /> Please add your phone number
                      </p>
                    </div>
                  )}
                  {userFullProfile?.phone ? (
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant px-1">
                        Phone Number
                      </label>
                      <input
                        className="bg-[#dde3dc] w-full bg-surface-container-highest border-none rounded-xl p-4 opacity-70 cursor-not-allowed"
                        type="text"
                        value={userFullProfile?.phone}
                        disabled
                        readOnly
                      />
                    </div>
                  ) : (
                    <form.Field name="phone_number">
                      {(field) => (
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant px-1">
                            Phone Number
                          </label>
                          <input
                            className="bg-[#dde3dc] w-full bg-surface-container-highest border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 transition-all"
                            type="tel"
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="+1234567890"
                          />
                        </div>
                      )}
                    </form.Field>
                  )}

                  {/* Country - Non Editable */}

                  {!userFullProfile?.country && (
                    <div>
                      <p className="text-red-500 flex gap-2">
                        <MessageSquareWarning /> Please add your country
                      </p>
                    </div>
                  )}
                  {userFullProfile?.country && (
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant px-1">
                        Country
                      </label>
                      <input
                        className="bg-[#dde3dc] w-full bg-surface-container-highest border-none rounded-xl p-4 opacity-70 cursor-not-allowed"
                        type="text"
                        value={userFullProfile?.country || ""}
                        disabled
                        readOnly
                      />
                    </div>
                  )}

                  {!userFullProfile?.country && (
                    <Field className="m-1">
                      <FieldLabel
                        className="text-sm font-label font-semibold text-on-surface-variant uppercase tracking-wider"
                        htmlFor="country"
                      >
                        Country
                      </FieldLabel>
                      <form.Field name="country">
                        {(field) => {
                          return (
                            <Combobox
                              items={countries}
                              onValueChange={(e) => {
                                field.handleChange(e as string);
                              }}
                              value={field.state.value}
                            >
                              <ComboboxTrigger
                                className="h-15 bg-[#dfe4dd]"
                                render={<SelectButton />}
                              >
                                <ComboboxValue placeholder="Select a country" />
                              </ComboboxTrigger>
                              <ComboboxPopup
                                aria-label="Select a country"
                                className="w-1/2"
                              >
                                <div className="border-b p-2">
                                  <ComboboxInput
                                    className="rounded-md before:rounded-[calc(var(--radius-md)-1px)] pl-8"
                                    placeholder="Search countries..."
                                    showTrigger={false}
                                    startAddon={<SearchIcon />}
                                    onChange={(e) =>
                                      setSearchCountry(e.target.value)
                                    }
                                  />
                                </div>
                                <ComboboxEmpty>
                                  No countries found.
                                </ComboboxEmpty>
                                <ComboboxList>
                                  {countries?.length > 0 ? (
                                    (item) => (
                                      <ComboboxItem
                                        key={item.iso2}
                                        value={item.name}
                                      >
                                        {item.name}
                                      </ComboboxItem>
                                    )
                                  ) : (
                                    <Spinner className="w-8 h-8 text-blue-500" />
                                  )}
                                </ComboboxList>
                              </ComboboxPopup>
                            </Combobox>
                          );
                        }}
                      </form.Field>
                    </Field>
                  )}

                  {!userFullProfile?.avatar_url && (
                    <div>
                      <p className="text-red-500 flex gap-2 mt-5">
                        <MessageSquareWarning /> Please upload your image
                      </p>
                    </div>
                  )}

                  {/* Avatar URL - Editable */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant px-1">
                      Avatar URL
                    </label>

                    <FileUploader
                      profile_image={true}
                      setImageFile={setImageFile}
                      setImage={setImage}
                      mutateOptimisticImage={mutateOptimisticImage}
                      mutateOptimisticImageFile={mutateOptimisticImageFile}
                      resetForm={resetForm}
                      setResetForm={setResetForm}
                    />
                  </div>

                  {/* Bio - Editable */}
                  {!userFullProfile?.bio && (
                    <div>
                      <p className="text-red-500 flex gap-2">
                        <MessageSquareWarning /> Please add your bio
                      </p>
                    </div>
                  )}
                  <form.Field name="bio">
                    {(field) => (
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant px-1">
                          Bio
                        </label>
                        <textarea
                          className="bg-[#dde3dc] w-full bg-surface-container-highest border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                          rows={4}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder={userFullProfile?.bio || ""}
                        />
                      </div>
                    )}
                  </form.Field>
                </div>
              </section>

              {/* Right Column */}
              <div className="flex flex-col gap-8">
                {/* Social Presence */}
                <section className="bg-[#f3f1ed] rounded-3xl p-8 h-fit">
                  <div className="flex items-center gap-3 mb-6">
                    <User className="text-primary" />
                    <h3 className="text-lg font-bold">Social Presence</h3>
                  </div>
                  <div className="space-y-5">
                    {/* Email - Non Editable */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant px-1">
                        Email
                      </label>
                      <input
                        className="bg-[#dde3dc] w-full bg-surface-container-highest border-none rounded-xl p-4 opacity-70 cursor-not-allowed"
                        type="email"
                        value={userFullProfile?.email || ""}
                        disabled
                        readOnly
                      />
                    </div>

                    {/* Social links */}
                    <div className="flex flex-col gap-3 pt-6 border-t border-[#dde3dc]">
                      <Button
                        variant="outline"
                        type="button"
                        className="cursor-pointer bg-white"
                        size="lg"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-5 h-5 mr-2 inline-block"
                        >
                          <path
                            d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                            fill="currentColor"
                          />
                        </svg>
                        Link with Apple
                      </Button>
                      <Button
                        variant="outline"
                        type="button"
                        className="cursor-pointer bg-white"
                        size="lg"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-5 h-5 mr-2 inline-block"
                        >
                          <path
                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                            fill="currentColor"
                          />
                        </svg>
                        Link with Google
                      </Button>
                    </div>
                  </div>
                </section>

                {/* Travel Details */}
                <section className="bg-[#f3f1ed] rounded-3xl p-8 h-fit">
                  <div className="flex items-center gap-3 mb-6">
                    <Map className="stroke-yellow-600" />
                    <h3 className="text-lg font-bold">Travel Details</h3>
                  </div>
                  <div className="space-y-5">
                    <div className="flex flex-2 flex-wrap gap-2 mb-5">
                      {userFullProfile?.travel_interests?.length === 0 ? (
                        <p className="text-red-500 flex gap-2">
                          <MessageSquareWarning /> Please add your travel
                          interests
                        </p>
                      ) : (
                        travelInterests.map((interest: string, idx: number) => (
                          <p key={idx}
                            className="text-black flex items-center gap-1 relative bg-secondary p-2 rounded-full text-sm"
                          >
                            {interest}
                          <XCircleIcon onClick={() => handleRemoveInterest(interest)} className="text-red-500 bg-white rounded-full outline-0 border-0 p-0 w-5 h-5 cursor-pointer absolute left-31 bottom-6" />
                          </p>
                        ))
                      )}
                    </div>
                    {/* Travel Interests - Editable */}
                    <form.Field name="travel_interests">
                      {(field) => (
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant px-1">
                            Travel Interests
                          </label>
                          <textarea
                            className="bg-[#dde3dc] w-full bg-surface-container-highest border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                            rows={3}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="Hiking, Photography, etc."
                          />
                        </div>
                      )}
                    </form.Field>

                    {/* Visited Countries - Non Editable */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant px-1">
                        Visited Countries
                      </label>
                      <textarea
                        className="bg-[#dde3dc] w-full bg-surface-container-highest border-none rounded-xl p-4 opacity-70 cursor-not-allowed resize-none"
                        rows={1}
                        value={displayVisitedCountries}
                        disabled
                        readOnly
                      />
                    </div>
                  </div>
                </section>

                {/* Account Details */}
                <section className="bg-[#f3f1ed] rounded-3xl p-8 h-fit">
                  <div className="flex items-center gap-3 mb-6">
                    <User className="stroke-yellow-600" />
                    <h3 className="text-lg font-bold">Account Details</h3>
                  </div>
                  <div className="space-y-5">
                    {/* Is Premium - Non Editable */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant px-1">
                        Premium Status
                      </label>
                      <input
                        className="bg-[#dde3dc] w-full bg-surface-container-highest border-none rounded-xl p-4 opacity-70 cursor-not-allowed"
                        type="text"
                        value={userFullProfile?.is_premium ? "Premium" : "Free"}
                        disabled
                        readOnly
                      />
                    </div>

                    {/* Subscription Tier - Non Editable */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant px-1">
                        Subscription Tier
                      </label>
                      <input
                        className="bg-[#dde3dc] w-full bg-surface-container-highest border-none rounded-xl p-4 opacity-70 cursor-not-allowed"
                        type="text"
                        value={userFullProfile?.subscription_tier || "Basic"}
                        disabled
                        readOnly
                      />
                    </div>

                    {/* Subscription Expires At - Non Editable */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant px-1">
                        Subscription Expires At
                      </label>
                      <input
                        className="bg-[#dde3dc] w-full bg-surface-container-highest border-none rounded-xl p-4 opacity-70 cursor-not-allowed"
                        type="text"
                        value={
                          userFullProfile?.subscription_expires_at
                            ? String(userFullProfile?.subscription_expires_at)
                            : "N/A"
                        }
                        disabled
                        readOnly
                      />
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-300 mt-8">
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <Button
                    size="xl"
                    type="submit"
                    disabled={!canSubmit}
                    className="w-full rounded-full active:scale-[0.99] transition-all"
                  >
                    {isSubmitting ? "Updating..." : "Update Profile"}
                  </Button>
                )}
              </form.Subscribe>
            </div>
          </form>
        </>
      )}
    </main>
  );
}
