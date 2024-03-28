import { BsStar } from "react-icons/bs";
import { BsStarFill } from "react-icons/bs";
import React, { FC } from "react";

interface Props {
  isFavorite: boolean;
  title: string;
  description: string;
  icon: string;
}
const BoardOverview: FC<Props> = ({ description, icon, isFavorite, title }) => {
  return (
    <section>
      {/* Favorite button */}
      <button>
        {isFavorite ? (
          <BsStarFill color="FFCD4B" size={23} />
        ) : (
          <BsStar color="FFCD4B" size={23} />
        )}
      </button>

      {/* Board icon and name */}
      <div className="py-2 px-5 flex gap-3 drop-shadow-lg">
        <p className="text-3xl">{icon}</p>
        <p className="text-3xl font-bold">{title}</p>
      </div>
      {/* Board description */}
      <div className="px-10">
        <p className="whitespace-pre-wrap text-gray-600">{description}</p>
      </div>
    </section>
  );
};

export default BoardOverview;
