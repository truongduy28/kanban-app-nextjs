import Section from "@/components/Section/Section";
import { useCreateSection } from "@/hooks/useSectionApi";
import { ISection } from "@/types/section.type";
import { useQueryClient } from "@tanstack/react-query";
import { FC } from "react";

interface Props {
  boardId: string;
  sections: ISection[];
}
const SectionManagers: FC<Props> = ({ boardId, sections = [] }) => {
  const queryClient = useQueryClient();

  // API: create new section on this board
  const { mutate, isPending } = useCreateSection(boardId);

  const onSectionCreate = () => {
    mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getOneBoard", boardId] });
      },
    });
  };

  return (
    <div>
      {/* Add section button */}
      <span
        className="text-primary-500 font-semibold mx-5 cursor-pointer hover:bg-gray-50 px-7 py-2 rounded-md text-sm transition-all"
        onClick={isPending ? undefined : onSectionCreate}
      >
        {isPending ? "CREATE..." : "ADD NEW SECTION"}
      </span>
      <hr className="h-[2px] w-full my-4" />

      {/* Sections */}
      <div className="flex items-start gap-5 overflow-x-auto w-full flex-nowrap">
        {sections.map((section) => (
          <Section key={section._id} {...section} />
        ))}
      </div>
    </div>
  );
};

export default SectionManagers;
