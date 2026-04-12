import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectButton,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { useForm } from "@tanstack/react-form";
import { CalendarIcon, LucideForm, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios/httpUtils";
import { envVars } from "@/src/config/env";
import { Popover, PopoverPopup, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

export default function TripFilters() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [countryData, setCountryData] = useState();
  const [date, setDate] = useState<Date | undefined>();

  const items = [
    { label: "Solo", value: "solo" },
    { label: "Couple", value: "couple" },
    { label: "Family", value: "family" },
    { label: "Group", value: "group" },
  ];

  const form = useForm({
    defaultValues: {
      travel_type: "",
      country: "",
      budget_range: "",
      max_travelers: "",
      min_budget: "",
      max_budget: "",
      date: "",
    },

    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  const fetchCountryLists = async (search: string) => {
    setIsLoading(true);
    const response = await axiosInstance.get(
      envVars.NEXT_PUBLIC_GET_COUNTRY_LISTS,
      {
        params: { page: 1, limit: 10, search: search },
      },
    );
    setCountryData(response.data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCountryLists("");
  }, []);
  

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-5"
    >
      {/* travel type & country */}
      <div className="flex gap-5">
        <form.Field name="travel_type">
          {(field) => {
            return (
              <Select
                aria-label="Select Types"
                items={items}
                onValueChange={(e) => {
                  field.handleChange(e as string);
                }}
                value={field.state.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Types" />
                </SelectTrigger>
                <SelectPopup>
                  <SelectItem value="solo">Solo</SelectItem>
                  <SelectItem value="couple">Couple</SelectItem>
                  <SelectItem value="family">Family</SelectItem>
                  <SelectItem value="group">Group</SelectItem>
                </SelectPopup>
              </Select>
            );
          }}
        </form.Field>

        <form.Field name="country">
          {(field) => {
            return (
              <Combobox
                items={countryData}
                value={field.state.value}
                onValueChange={(e) => {
                  field.handleChange(e as string);
                }}
              >
                <ComboboxTrigger render={<SelectButton />}>
                  <ComboboxValue placeholder="Select a Country" />
                </ComboboxTrigger>
                <ComboboxPopup aria-label="Select a Country" className="w-12">
                  <div className="">
                    <ComboboxInput
                      className="rounded-md before:rounded-[calc(var(--radius-md)-1px)] pl-10"
                      placeholder="Search Countries"
                      showTrigger={false}
                      startAddon={<SearchIcon />}
                      onChange={(e) => {
                        fetchCountryLists(e.target.value);
                      }}
                    />
                  </div>
                  <ComboboxEmpty>Search your country...</ComboboxEmpty>
                  <ComboboxList
                    className={
                      isLoading ? "flex items-center justify-center h-full" : ""
                    }
                  >
                    {isLoading ? (
                      <Spinner className="w-8 h-8" />
                    ) : (
                      (item, idx) => (
                        <ComboboxItem key={idx} value={item.name}>
                          {item.name}
                        </ComboboxItem>
                      )
                    )}
                  </ComboboxList>
                </ComboboxPopup>
              </Combobox>
            );
          }}
        </form.Field>
      </div>

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
                  onChange={(e) => field.handleChange(e.target.value)}
                  required
                  className="bg-slate-200 h-10 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 transition-all text-lg font-medium"
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
                  onChange={(e) => field.handleChange(e.target.value)}
                  required
                  className="bg-slate-200 h-10 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 transition-all text-lg font-medium"
                />
              </>
            );
          }}
        </form.Field>
      </div>

      <form.Field name="date">
        {(field) => {
          return (
            <Popover>
              <PopoverTrigger
                render={
                  <Button className="w-full justify-start" variant="outline" />
                }
              >
                <CalendarIcon aria-hidden="true" />
                {date ? format(date, "PPP") : "Pick a date"}
              </PopoverTrigger>
              <PopoverPopup>
                <Calendar
                  defaultMonth={date}
                  mode="single"
                  onSelect={setDate}
                  selected={date}
                />
              </PopoverPopup>
            </Popover>
          );
        }}
      </form.Field>

      {/* submit & reset buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          type="submit"
          size="lg"
          className="cursor-pointer bg-secondary text-white h-15 py-5 rounded-full font-headline font-bold text-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <LucideForm />
          Filter Trip
        </Button>
        <Button
          type="button"
          size="lg"
          onClick={() => {
            form.reset();
          }}
          className="cursor-pointer bg-[#dfe4dd] text-on-surface-variant h-15 py-4 rounded-full font-headline font-bold hover:bg-surface-container transition-all active:scale-95"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
