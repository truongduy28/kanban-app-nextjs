import {
  useGetAllBoards,
  useGetFavoriteBoards,
  useUpdateFavoritePosition,
  useUpdatePosition,
} from "@/hooks/useBoardApi";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import BoardItem from "./components/BoardItem";
import BoardListProvider from "./components/BoardListProvider/BoardListProvider";
import BoardListTitle from "./components/BoardListProvider/BoardListTitle";
import FooterSideBar from "./components/FooterSideBar";
import HeaderSideBar from "./components/HeaderSidebar";

const SideBar: FC = () => {
  const boardId: string = useSearchParams().get("id") || "";
  const route = useRouter();

  const [activeBoard, setActiveBoard] = useState<string>("");

  // API: get all boards
  const { data = [] } = useGetAllBoards();

  // API: get all favorite boards
  const { data: favoriteData = [] } = useGetFavoriteBoards();

  // API: update position of boards
  const { mutate: updatePosition } = useUpdatePosition();

  //API: update position of favorite boards
  const { mutate: favoritePositionUpdate } = useUpdateFavoritePosition();

  useEffect(() => {
    if (data.length && !boardId) route.push(`?id=${data[0]._id}`);
    if (data.length && boardId && boardId !== activeBoard)
      setActiveBoard(boardId);
  }, [activeBoard, boardId, data, route]);

  const onDragEnd: OnDragEndResponder = ({ source, destination }) => {
    const newList = data;
    const [removed] = newList.splice(source.index, 1);
    newList.splice((destination as any).index, 0, removed);

    updatePosition(newList, {
      onSuccess: () => console.log("update position success"),
    });
  };

  const onFavoriteBoardDragEnd: OnDragEndResponder = ({
    source,
    destination,
  }) => {
    const newList = favoriteData;
    const [removed] = newList.splice(source.index, 1);
    newList.splice((destination as any).index, 0, removed);

    favoritePositionUpdate(newList, {
      onSuccess: () => console.log("update favorite position success"),
    });
  };

  return (
    <div className="fixed left-0 bottom-0 top-0 bg-white w-1/5 h-screen overflow-auto border-r border-r-gray-200 flex flex-col">
      {/* Header with logo and actions for app */}
      <HeaderSideBar />

      {/* Boards list with favorites and lists */}
      <BoardListProvider>
        <BoardListTitle title="Favorites" />
        <DragDropContext onDragEnd={onFavoriteBoardDragEnd}>
          <Droppable
            key={"list-favorite-board-droppable-key"}
            droppableId={"list-favorite-board-droppable"}
          >
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {favoriteData.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      >
                        <BoardItem
                          onClick={() => setActiveBoard(item.id)}
                          active={activeBoard === item.id}
                          to={`?id=${item.id}`}
                          isDragging={snapshot.isDragging}
                          item={{ ...item }}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <BoardListTitle title="Boards" isCreateButton />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            key={"list-board-droppable-key"}
            droppableId={"list-board-droppable"}
          >
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {data.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      >
                        <BoardItem
                          onClick={() => setActiveBoard(item.id)}
                          active={activeBoard === item.id}
                          to={`?id=${item.id}`}
                          isDragging={snapshot.isDragging}
                          item={{ ...item }}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </BoardListProvider>

      {/* Footer with user information and sign out action */}
      <FooterSideBar />
    </div>
  );
};

export default SideBar;
