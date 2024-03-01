// import { useState } from "react";
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

import { timeOptions } from "../data/timeOptions";
import { Switch } from "./ui/switch";

const formSchema = z.object({
  workTime: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  breakTime: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  marketing_emails: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

interface TimeOptions {
  value: string;
  text: string;
}

export const TimerSettings = () => {
  // const [workTime, setWorkTime] = useState(25);
  // const [breakTime, setBreakTime] = useState(5);
  // const [position, setPosition] = useState("bottom");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workTime: "",
      breakTime: "",
      marketing_emails: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center gap-2 bg-black p-3 w-full mb-10"
      >
        <FormField
          control={form.control}
          name="workTime"
          render={({ field }) => (
            <FormItem className="w-full">
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-[#0e0e0e] border-none rounded-[10px]">
                    <SelectValue placeholder="Tiempo de trabajo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-[#0e0e0e] border-none rounded-[10px]  border-[#3f3f42]">
                  <SelectGroup>
                    {timeOptions.work_time.map(
                      ({ value, text }: TimeOptions) => (
                        <SelectItem value={value} key={value}>
                          {text}
                        </SelectItem>
                      )
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="breakTime"
          render={({ field }) => (
            <FormItem className="w-full">
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-[#0e0e0e] border-none rounded-[10px] max-w-[100%]">
                    <SelectValue placeholder="Tiempo de descanso" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-[#0e0e0e] border-none rounded-[10px]  border-[#3f3f42]">
                  <SelectGroup>
                    {timeOptions.break_time.map(
                      ({ value, text }: TimeOptions) => (
                        <SelectItem value={value} key={value}>
                          {text}
                        </SelectItem>
                      )
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="marketing_emails"
          render={({ field }) => (
            <FormItem className="w-full">
              <div className="flex items-center justify-between bg-[#0e0e0e] border-none rounded-[10px] max-w-[100%] h-10 px-3 py-2">
                <FormLabel>Auto start</FormLabel>
                <FormControl>
                  <Switch
                    // checked={field.value}
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
