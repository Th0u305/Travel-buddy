import { useForm } from "@tanstack/react-form";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { toast } from "sonner";

const AddTags = ({setTags, tags}: {
  setTags: (tags: string[]) => void,
  tags: string[]
}) => {
  const form = useForm({
    defaultValues: {
      tags: "",
    },

    onSubmit: async ({ value }) => {

      const isTagExist = tags.includes(value.tags)
      
      if(value.tags.length < 6){
        return toast.error("Please enter a tag of at least 6 characters")
      }
      
      if(value.tags.length > 22){
        return toast.error("Word limit is 22")
      }
      
      if (tags.length > 6) {
        return toast.error("You can only add 7 tags")
      }
      
      if(isTagExist){
        return toast.error("This tag is already added")
      }
      setTags([...tags, value.tags])
    },
  });

  return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="mt-5 mb-5 flex flex-col sm:flex-row gap-2"
      >
        <form.Field name="tags">
          {(field) => {
            return (
              <>
                <Input
                  type="text"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Add Tag"
                  required
                  className="bg-[#dfe4dd] h-9 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 transition-all text-lg font-medium"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="bg-[#dfe4dd] text-black px-4 py-2 rounded-full font-bold border-dashed border-2 border-black hover:border-primary transition-all"
                >
                  + Add Tag
                </Button>
              </>
            );
          }}
        </form.Field>
      </form>
  );
};

export default AddTags;
