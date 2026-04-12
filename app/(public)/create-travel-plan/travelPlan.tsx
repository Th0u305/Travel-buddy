"use client";

import FileUploader from "@/src/utils/fileUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import { CalendarIcon, Compass, Edit, Map, Users, XCircleIcon } from "lucide-react";
import Image from "next/image";
import { startTransition, useOptimistic, useState } from "react";
import { toast } from "sonner";
import { envVars } from "@/src/config/env";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import AddTags from "@/app/(public)/create-travel-plan/addTags";
import { useCreateTravelPlanMutate } from "@/src/tanstack/useMutation";
import { createPlanSchema } from "@/src/zod/zodValidation";
import { Spinner } from "@/components/ui/spinner";
import { Popover, PopoverPopup, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";



export default function TravelPlan() {
  const originalImage = `https://res.cloudinary.com/${envVars.NEXT_PUBLIC_IMAGE_CLOUD_NAME}/image/upload/q_auto/f_auto/v1775166873/cxvbxkhrmc3507c7ubba.avif`;
  const [image, setImage] = useState<string>(originalImage);
  const [optimisticImage, mutateOptimisticImage] = useOptimistic<string>(image);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [optimisticImageFile, mutateOptimisticImageFile] =
    useOptimistic<File | null>(imageFile);

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { createTravelPlan } = useCreateTravelPlanMutate();

  const [resetForm, setResetForm] = useState<boolean>(false);

  const [date, setDate] = useState<DateRange | undefined>();

  const form = useForm({
    defaultValues: {
      cover_url: "",
      trip_title: "",
      country: "",
      city: "",
      travel_type: "solo",
      start_date: "",
      end_date: "",
      min_budget: "",
      max_budget: "",
      max_travelers: "",
      trip_description: "",
      looking_for_buddy: "",
      tags: "",
    },

    onSubmit: async ({ value }) => {

      const startDate = date?.from ? new Date(date.from).toISOString().split('T')[0] : '';
      const endDate = date?.to ? new Date(date.to).toISOString().split('T')[0] : '';
      const isImage = optimisticImage.startsWith("blob:");

      if(startDate === endDate){
        return toast.error("Start date and end date cannot be same")
      }

      if (
        optimisticImageFile === null ||
        optimisticImageFile === undefined ||
        !isImage ||
        !optimisticImageFile
      ) {
        return toast.error("Please upload an image");
      }

      if (Number(value.min_budget) > Number(value.max_budget)) {
        return toast.error("Minimum budget must be less than maximum budget");
      }

      const modifiedData = {
        ...value,
        min_budget: Number(value.min_budget),
        max_budget: Number(value.max_budget),
        max_travelers: Number(value.max_travelers),
        tags: tags,
        looking_for_buddy: isChecked,
        status: "active",
      };

      const validate = createPlanSchema.safeParse(modifiedData);

      if (!validate.success) {
        const aaa = validate.error.issues.map((item) => item.message);
        return aaa.forEach((msg) => {
          toast.error(msg);
          setIsLoading(false);
        });
      }

      const formData = new FormData();

      if (optimisticImageFile instanceof File) {
        formData.append("file", optimisticImageFile);
        formData.append("upload_preset", "travel_plan");
        formData.append("cloud_name", envVars.NEXT_PUBLIC_IMAGE_CLOUD_NAME);
      }
      try {
        setIsLoading(true);
        toast.loading("Creating your travel plan...");

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${envVars.NEXT_PUBLIC_IMAGE_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          },
        );

        const data = await response.json();

        if (!response.ok) {
          return toast.error("Failed to upload image. Please try again later.");
        }
        startTransition(() => {
          mutateOptimisticImage(data.secure_url);
        });
        setImage(data.secure_url);

        const modifiedData2 = {
          ...modifiedData,
          cover_url: data.secure_url,
        };

        createTravelPlan(modifiedData2);
        setIsLoading(false);
        toast.success("Travel plan created successfully");
        toast.dismiss();
        setTags([]);
        form.reset();
        startTransition(() => {
          mutateOptimisticImageFile(null);
          mutateOptimisticImage(originalImage);
        });
        setResetForm(true);
        setImageFile(null);
        setImage(originalImage);
        return;
      } catch {
        toast.error("Something went wrong. Please try again later.");
        setIsLoading(false);
        return;
      }
    },
  });

  return (
    <div className="text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen flex flex-col">
      {/* Top Navigation Shell */}

      {/* <nav className="fixed top-0 w-full z-50 bg-[#fafaf5]/80 backdrop-blur-xl shadow-sm">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="text-2xl font-black tracking-tight text-[#30332e]">Modern Explorer</div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="font-headline font-bold text-lg text-[#5c605a] hover:text-[#30332e] transition-colors duration-200">Explore</a>
            <a href="#" className="font-headline font-bold text-lg text-[#5c605a] hover:text-[#30332e] transition-colors duration-200">Community</a>
            <a href="#" className="font-headline font-bold text-lg text-[#a33f00] border-b-2 border-[#a33f00] pb-1">Journal</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-[#f3f4ee]/50 active:scale-95 transition-all">
              <span className="material-symbols-outlined text-[#a33f00]">notifications</span>
            </button>

            avater image
  
          </div>
        </div>
      </nav> */}

      <main className="pt-24 pb-20 px-4 md:px-8 max-w-5xl mx-auto grow w-full">
        {/* Hero Header */}
        <header className="mb-12">
          {/* <nav className="flex items-center gap-2 mb-4 text-on-surface-variant font-label text-sm uppercase tracking-widest">
            <span>Journal</span>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-primary font-bold">New Adventure</span>
          </nav> */}
          <h1 className="font-headline font-black text-5xl md:text-6xl tracking-tight text-on-surface">
            Map Your <span className="text-primary">Next Path</span>
          </h1>
          <p className="mt-4 text-on-surface-variant text-lg max-w-2xl">
            The best stories aren&apos;t told; they&apos;re lived. Share your
            upcoming journey and find fellow explorers to join the trail.
          </p>
        </header>

        {/* Visuals Section (Hero Placement) */}
        <section className="relative h-100 w-full rounded-2xl overflow-hidden shadow-sm group mb-7">
          <Image
            width={1000}
            height={1000}
            src={optimisticImage}
            loading="eager"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            data-alt="dramatic mountain landscape at dusk with orange and teal skies reflecting on a still alpine lake"
            id="cover-preview"
            alt="Cover preview"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent h-full"></div>
          <div className="absolute bottom-8 left-8 right-8">
            <div className="flex gap-2 flex-col">
              <label
                htmlFor="cover_url"
                className="text-white font-headline font-bold text-lg"
              >
                Cover Image URL
              </label>

              {/* file uploader */}

              <FileUploader
                profile_image={false}
                setImageFile={setImageFile}
                setImage={setImage}
                mutateOptimisticImage={mutateOptimisticImage}
                mutateOptimisticImageFile={mutateOptimisticImageFile}
                resetForm={resetForm}
                setResetForm={setResetForm}
              />
            </div>
          </div>
        </section>

        {/* form start */}

        <div className="space-y-8">
          {/* Grid Layout for Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {/* Main Form Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Trip Basics */}
              <div className="bg-surface-container-low p-5 bg-muted rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <Compass />
                  <h2 className="font-headline font-bold text-2xl">
                    Trip Basics
                  </h2>
                </div>
                <div className="space-y-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-label font-semibold text-on-surface-variant uppercase tracking-wider">
                      Trip Title
                    </label>

                    <form.Field name="trip_title">
                      {(field) => {
                        return (
                          <>
                            <Input
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              type="text"
                              placeholder="e.g., Andean Highlands Expedition"
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              required
                              className="bg-[#dfe4dd] h-15 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 transition-all text-lg font-medium"
                            />
                          </>
                        );
                      }}
                    </form.Field>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-label font-semibold text-on-surface-variant uppercase tracking-wider">
                        Country
                      </label>

                      <form.Field name="country">
                        {(field) => {
                          return (
                            <>
                              <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                type="text"
                                placeholder="Peru"
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                required
                                className="bg-[#dfe4dd] h-15 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 transition-all text-lg font-medium"
                              />
                            </>
                          );
                        }}
                      </form.Field>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-label font-semibold text-on-surface-variant uppercase tracking-wider">
                        City
                      </label>

                      <form.Field name="city">
                        {(field) => {
                          return (
                            <>
                              <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                type="text"
                                placeholder="City"
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                required
                                className="bg-[#dfe4dd] h-15 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 transition-all text-lg font-medium"
                              />
                            </>
                          );
                        }}
                      </form.Field>
                    </div>
                  </div>
                </div>
              </div>

              {/* Adventure Details */}
              <div className="bg-surface-container-low p-5 rounded-2xl bg-muted">
                <div className="flex items-center gap-3 mb-6">
                  <Edit className="mr-2" />
                  <h2 className="font-headline font-bold text-2xl">
                    Adventure Details
                  </h2>
                </div>
                <div className="space-y-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-label font-semibold text-on-surface-variant uppercase tracking-wider">
                      Travel Type
                    </label>

                    <form.Field name="travel_type">
                      {(field) => {
                        return (
                          <ToggleGroup
                            defaultValue={["solo"]}
                            onValueChange={(value) => {
                              field.handleChange(value[0]);
                            }}
                            size="lg"
                            className="flex-wrap gap-2"
                          >
                            <ToggleGroupItem value="solo">Solo</ToggleGroupItem>

                            <ToggleGroupItem value="couple">
                              Couple
                            </ToggleGroupItem>

                            <ToggleGroupItem value="family">
                              Family
                            </ToggleGroupItem>

                            <ToggleGroupItem value="group">
                              Group
                            </ToggleGroupItem>
                          </ToggleGroup>
                        );
                      }}
                    </form.Field>
                  </div>

                  {/* trip inserted */}

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-label font-semibold text-on-surface-variant uppercase tracking-wider">
                      Trip Interests
                    </label>
                    <div className="flex flex-2 flex-wrap gap-2">
                      {tags.map((item, idx) => {
                        return (
                          <span
                            key={idx}
                            className={`relative flex-wrap  text-on-secondary-container px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${idx % 2 === 0 ? "bg-secondary" : "bg-accent"}`}
                          >
                            <span className="material-symbols-outlined text-sm">
                              {item}
                            </span>
                            <XCircleIcon
                              onClick={() =>
                                setTags(tags.filter((_, i) => i !== idx))
                              }
                              className="text-red-500 bg-white rounded-full outline-0 border-0 p-0 w-5 h-5 cursor-pointer absolute top-0 right-0 -translate-y-1 translate-x-1"
                            />
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* add tags */}
                <AddTags setTags={setTags} tags={tags} />

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-label font-semibold text-on-surface-variant uppercase tracking-wider">
                    Description
                  </label>

                  <form.Field name="trip_description">
                    {(field) => {
                      return (
                        <>
                          <Textarea
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            required
                            placeholder="Share the mood of your trip. Are we chasing sunrises or exploring hidden local markets?"
                            className="bg-[#dfe4dd] h-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                          />
                        </>
                      );
                    }}
                  </form.Field>
                </div>
              </div>
            </div>

            {/* Sidebar Content (Timing, Budget, Buddy) */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="space-y-8"
            >
              {/* Timing & Budget */}
              <div className="bg-surface-container-high p-5 rounded-2xl bg-[#dfe4dd] border border-outline-variant/10">
                <div className="flex items-center gap-3 mb-6">
                  <CalendarIcon />
                  <h2 className="font-headline font-bold text-xl">
                    Timing & Budget
                  </h2>
                </div>

   <Popover>
      <PopoverTrigger
        render={<Button className="w-full justify-start" variant="outline" />}
      >
        <CalendarIcon aria-hidden="true" />
        {date?.from ? (
          date.to ? (
            <>
              {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
            </>
          ) : (
            format(date.from, "LLL dd, y")
          )
        ) : (
          <span>Pick a date range</span>
        )}
      </PopoverTrigger>
      <PopoverPopup>
        <Calendar
          defaultMonth={date?.from}
          mode="range"
          onSelect={setDate}
          selected={date}
        />
      </PopoverPopup>
    </Popover>


                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-label font-bold text-on-surface-variant uppercase">
                        Start Date
                      </label>

                      <form.Field name="start_date">
                        {(field) => {
                          return (
                            <>
                              <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                type="date"
                                placeholder="e.g., Andean Highlands Expedition"
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                required
                                className="bg-white h-10 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 transition-all text-lg font-medium"
                              />
                            </>
                          );
                        }}
                      </form.Field>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-label font-bold text-on-surface-variant uppercase">
                        End Date
                      </label>

                      <form.Field name="end_date">
                        {(field) => {
                          return (
                            <>
                              <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                type="date"
                                placeholder="e.g., Andean Highlands Expedition"
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                required
                                className="bg-white h-10 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 transition-all text-lg font-medium"
                              />
                            </>
                          );
                        }}
                      </form.Field>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-outline-variant/20">
                    <label className="text-xs font-label font-bold text-on-surface-variant uppercase mb-3 block">
                      Estimated Budget (USD)
                    </label>
                    <div className="flex items-center gap-3">
                      <form.Field name="min_budget">
                        {(field) => {
                          return (
                            <>
                              <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                type="number"
                                placeholder="Min"
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                required
                                className="bg-white h-10 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 transition-all text-lg font-medium"
                              />
                            </>
                          );
                        }}
                      </form.Field>

                      <span className="text-outline-variant">—</span>

                      <form.Field name="max_budget">
                        {(field) => {
                          return (
                            <>
                              <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                type="number"
                                placeholder="Max"
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                required
                                className="bg-white h-10 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 transition-all text-lg font-medium"
                              />
                            </>
                          );
                        }}
                      </form.Field>
                    </div>
                  </div>
                </div>
              </div>

              {/* Buddy Search (Glassmorphism Concept) */}
              <div className="bg-secondary-container/30 p-5 rounded-2xl bg-[#e9f8ee] border border-secondary-container relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Users className="mr-2" />
                      <h2 className="font-headline font-bold text-xl text-on-secondary-fixed">
                        Buddy Search
                      </h2>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <form.Field name="looking_for_buddy">
                        {(field) => {
                          return (
                            <Switch
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              checked={isChecked}
                              className="data-unchecked:bg-red-400"
                            />
                          );
                        }}
                      </form.Field>
                    </label>
                  </div>

                  {/* max buddies needed */}

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm font-medium">
                      <span className="text-on-secondary-fixed-variant">
                        Max Buddies Needed
                      </span>

                      <form.Field name="max_travelers">
                        {(field) => {
                          return (
                            <Select
                              onValueChange={(e) => {
                                field.handleChange(e as string);
                                setIsChecked(Number(e) > 1 ? true : false);
                              }}
                              value={field.state.value}
                            >
                              <SelectTrigger className="border-none rounded-lg text-sm focus:ring-secondary/20 bg-white w-15">
                                <SelectValue placeholder="1" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="1">1</SelectItem>
                                  <SelectItem value="2">2</SelectItem>
                                  <SelectItem value="3">3</SelectItem>
                                  <SelectItem value="4">4</SelectItem>
                                  <SelectItem value="5">5</SelectItem>
                                  <SelectItem value="6">6</SelectItem>
                                  <SelectItem value="7">7</SelectItem>
                                  <SelectItem value="8">8</SelectItem>
                                  <SelectItem value="9">9</SelectItem>
                                  <SelectItem value="10">10</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          );
                        }}
                      </form.Field>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-label font-bold text-on-secondary-fixed-variant uppercase">
                        Current Status
                      </label>
                      <div className="flex gap-2">
                        <span className="bg-primary text-on-primary px-3 py-1 rounded-full text-xs font-black">
                          Highly Interested
                        </span>
                        <span className="bg-white/50 text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold">
                          Exploring
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Abstract Organic Shape Background */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-secondary/10 rounded-full blur-3xl"></div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-4">
                <Button
                  type="submit"
                  size="lg"
                  className="cursor-pointer bg-secondary text-white h-15 py-5 rounded-full font-headline font-bold text-lg shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  {!isLoading && <Map />}
                  {isLoading ? (
                    <Spinner className="w-12 h-12" />
                  ) : (
                    "Create Trip"
                  )}
                </Button>
                <Button
                  type="button"
                  size="lg"
                  onClick={() => {
                    form.reset();
                    startTransition(() => {
                      mutateOptimisticImageFile(null);
                      mutateOptimisticImage(originalImage);
                    });
                    setResetForm(true);
                    setImageFile(null);
                    setImage(originalImage);
                  }}
                  className="cursor-pointer bg-[#dfe4dd] text-on-surface-variant h-15 py-4 rounded-full font-headline font-bold hover:bg-surface-container transition-all active:scale-95"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      {/* Footer */}
      {/* <footer className="bg-[#f3f4ee] w-full mt-auto border-t-0">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 gap-4 w-full max-w-7xl mx-auto">
          <div className="flex flex-col gap-2">
            <span className="text-lg font-bold text-[#30332e]">Modern Explorer</span>
            <p className="font-['Manrope'] text-sm tracking-wide text-[#5c605a]">© 2024 The Modern Explorer. Built for the tactile traveler.</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-[#5c605a] hover:text-[#a33f00] transition-colors font-['Manrope'] text-sm tracking-wide">Privacy</a>
            <a href="#" className="text-[#5c605a] hover:text-[#a33f00] transition-colors font-['Manrope'] text-sm tracking-wide">Terms</a>
            <a href="#" className="text-[#5c605a] hover:text-[#a33f00] transition-colors font-['Manrope'] text-sm tracking-wide">Support</a>
            <a href="#" className="text-[#5c605a] hover:text-[#a33f00] transition-colors font-['Manrope'] text-sm tracking-wide">Contact</a>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
