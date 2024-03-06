import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { profiles } from "../data/timeOptions";
import { Switch } from "./ui/switch";
import { useState } from "react";

const formSchema = z.object({
  timeOptions: z.string().min(1, {
    message: "Selecciona una opción",
  }),
  autoStart: z.boolean(),
});

interface Profiles {
  name: string;
  description: string;
}

interface TimerSettingsProps {
  onUpdateTime: (newTime: number) => void;
  onUpdateTimeBreak: (newTimeBreak: number) => void;
}

export const TimerSettings = ({
  onUpdateTime,
  onUpdateTimeBreak,
}: TimerSettingsProps) => {
  const [selectedProfileName, setSelectedProfileName] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      timeOptions: "",
      autoStart: false,
    },
  });

  const handleProfileChange = (selectedProfileName: string) => {
    const selectedProfile = profiles.find(
      (profile) => profile.name === selectedProfileName
    );

    if (selectedProfile) {
      onUpdateTime(selectedProfile.workTime);
      onUpdateTimeBreak(selectedProfile.breakTime);
    }
  };

  return (
    <Form {...form}>
      <form className="flex flex-col justify-center items-center gap-2 p-3 w-full">
        <FormField
          control={form.control}
          name="timeOptions"
          render={({ field }) => (
            <FormItem className="w-full">
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  handleProfileChange(value);
                  setSelectedProfileName(value);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="bg-[#0e0e0e] border-none rounded-[10px]">
                    <SelectValue placeholder="Selecciona un perfil">
                      {selectedProfileName || "Selecciona un perfil"}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-[#0e0e0e] border-none rounded-[10px] border-[#3f3f42]">
                  <SelectGroup>
                    {profiles.map(({ name, description }: Profiles) => (
                      <SelectItem
                        value={name}
                        key={description}
                        className="flex justify-start p-3"
                      >
                        <p className="mb-1 font-medium">{name}</p>
                        <p className="text-xs">{description}</p>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="autoStart"
          render={({ field }) => (
            <FormItem className="w-full">
              <div className="flex items-center justify-between bg-[#0e0e0e] border-none rounded-[10px] max-w-[100%] h-10 px-3 py-2">
                <FormLabel className="font-font font-extralight">
                  Auto start
                </FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
