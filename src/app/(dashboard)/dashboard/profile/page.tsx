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
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import FileUploader from "@/src/utils/fileUploader";
import { envVars } from "@/src/config/env";
import { toast } from "sonner";
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
  const { isLoading, getUserFullProfileRefetch } = useGetUserFullProfile();
  const { userFullProfile } = useUserStore()
  const [image, setImage] = useState<string>(userFullProfile?.avatar_url || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [resetForm, setResetForm] = useState<boolean>(false);
  const [, mutateOptimisticImage] = useOptimistic<string>(image);
  const [optimisticImageFile, mutateOptimisticImageFile] = useOptimistic<File | null>(imageFile);

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
    : userFullProfile?.travel_interests || "";
    
  const form = useForm({
    defaultValues: {
      bio: "",
      travel_interests: "",
      country: "",
    },
    onSubmit: async ({ value }) => {
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
        toast.loading("Updating profile...");

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

        updateProfileMutate({
          user_id: userFullProfile?.id || "",
          image: data || "",
          bio: value.bio,
          travel_interests: value.travel_interests,
          country: value.country,
        });

        toast.dismiss();
        startTransition(() => {
          mutateOptimisticImage(data || "");
          setImageFile(null);
          setResetForm(true);
          mutateOptimisticImageFile(null);
        });
        userProfileRefetch();
        getUserFullProfileRefetch();
        // form.reset()

        return;
      } catch {
        toast.dismiss();
        toast.error("Something went wrong. Please try again later.");
        return;
      }
    },
  });

  return (
    <main className="max-w-4xl mx-auto px-6 pt-24 space-y-12 pb-12">
      {/* Profile Header Section */}
      <div className="mb-12">
        <h1 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight mb-2">
          Profile
        </h1>
      </div>
      {isLoading ? (
        <div className="h-screen">
          <Spinner className="w-fit mx-auto text-blue-600" />
        </div>
      ) : (
        <>
          <section className="relative flex flex-col md:flex-row items-end gap-6">
            <div className="relative group">
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
            </div>
            <div className="flex-1 pb-2">
              <h2 className="text-2xl font-bold text-on-surface">
                {userFullProfile?.full_name || "Unknown User"}
              </h2>
              <p className="text-on-surface-variant font-medium">
                Joined Travel Buddy
              </p>
            </div>
          </section>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="grid grid-cols-1 md:grid-cols-2 bg-[#f3f1ed] rounded-3xl"
          >
            {/* Personal Information */}
            <section className="p-8">
              <div className="flex items-center gap-3 mb-2">
                <User className="text-primary" />
                <h3 className="text-lg font-bold">Personal Information</h3>
              </div>

              <div className="space-y-5">
                {/* Full Name - Non Editable */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant px-1">
                    Full Name (Non-editable)
                  </label>
                  <input
                    className="bg-[#dde3dc] w-full bg-surface-container-highest border-none rounded-xl p-4 opacity-70 cursor-not-allowed"
                    type="text"
                    value={userFullProfile?.full_name || ""}
                    disabled
                    readOnly
                  />
                </div>

                {/* Email - Non Editable */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant px-1">
                     Email (Non-editable)
                  </label>
                  <input
                    className="bg-[#dde3dc] w-full bg-surface-container-highest border-none rounded-xl p-4 opacity-70 cursor-not-allowed"
                    type="email"
                    value={userFullProfile?.email || ""}
                    disabled
                    readOnly
                  />
                </div>

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
                      Country (Non-editable)
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
                            <ComboboxEmpty>No countries found.</ComboboxEmpty>
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

            {/* Account Details & Interests */}
            <section className="space-y-6 bg-surface-container-low p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Map className="stroke-yellow-600" />
                  <h3 className="text-lg font-bold">
                    Account & Travel Details
                  </h3>
                </div>
                <div className="flex flex-2 flex-wrap gap-2 mt-5 mb-5">
                  {userFullProfile?.travel_interests?.length === 0 ? (
                    <p className="text-red-500 flex gap-2">
                      <MessageSquareWarning /> Please add your travel interests
                    </p>
                  ) : (
                    <>
                        <span
                          // className={`relative flex-wrap  text-on-secondary-container px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${idx % 2 === 0 ? "bg-secondary" : "bg-accent"}`}
                        >
                          <span className="material-symbols-outlined text-sm">
                            {travelInterests}
                          </span>
                          {/* <XCircleIcon  className="text-red-500 bg-white rounded-full outline-0 border-0 p-0 w-5 h-5 cursor-pointer absolute top-0 right-0 -translate-y-1 translate-x-1" /> */}
                        </span>;
                      </>
                    
                  )}
                </div>
                <div className="space-y-5">
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
                      Visited Countries (Non-editable)
                    </label>
                    <textarea
                      className="bg-[#dde3dc] w-full bg-surface-container-highest border-none rounded-xl p-4 opacity-70 cursor-not-allowed resize-none"
                      rows={1}
                      value={displayVisitedCountries}
                      disabled
                      readOnly
                    />
                  </div>

                  {/* Is Premium - Non Editable */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant px-1">
                      Premium Status (Non-editable)
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
                      Subscription Tier (Non-editable)
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
                      Subscription Expires At (Non-editable)
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
              </div>

              <div className="pt-6 mt-auto">
                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                >
                  {([canSubmit, isSubmitting]) => (
                    <Button
                      type="submit"
                      disabled={!canSubmit}
                      className="w-full bg-primary text-white font-bold rounded-xl p-4 hover:opacity-90 active:scale-[0.98] transition-all flex justify-center items-center gap-2"
                    >
                      {isSubmitting ? "Updating..." : "Update Profile"}
                    </Button>
                  )}
                </form.Subscribe>
              </div>
            </section>
          </form>
        </>
      )}
    </main>
  );
}
