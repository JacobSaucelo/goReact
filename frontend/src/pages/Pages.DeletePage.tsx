import CompCard from "@/components/Comp.Card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TodosType } from "types/todos";

export default function PagesDeletePage() {
  let { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<TodosType>({
    ID: "",
    Title: "",
    Description: "",
    DueDate: new Date(),
    UpdatedDate: null,
    Priority: 1,
    Status: 1,
  });
  const [noId, setNoId] = useState<boolean>(false);

  useEffect(() => {
    handleFetchUpdate();
  }, []);

  const handleFetchUpdate = async () => {
    await fetch(import.meta.env.VITE_SERVER_URL + "/get-project/" + id)
      .then((res) => res.json())
      .then((data) => {
        console.log("data:", data);
        if (data.Data.ID === undefined) {
          setNoId(true);
          return;
        }

        setFormData(data.Data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = async () => {
    await fetch(import.meta.env.VITE_SERVER_URL + "/delete-todo", {
      method: "DELETE",
      body: JSON.stringify({
        ID: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data: ", data);
        navigate("/");
      })
      .catch((err) => console.log("error: ", err));
  };

  if (noId) return <div>this task doesnt exists</div>;

  return (
    <section>
      <CompCard todo={formData} />
      {/* <p>ID: {formData.ID}</p>
      <p>Title: {formData.Title}</p>
      <p>Description: {formData.Description}</p>
      <p>
        DueDate: {dayjs(formData.DueDate).format("ddd, MMM D, YYYY h:mm A")}
      </p>
      {formData.UpdatedDate && (
        <p>
          UpdatedDate:{" "}
          {dayjs(formData.UpdatedDate).format("ddd, MMM D, YYYY h:mm A")}
        </p>
      )}
      <p>Priority: {UtilsPriorityDisplay(formData.Priority)}</p>
      <p>Status: {UtilsStatusDisplay(formData.Status, true)}</p>

      <h1 className="text-2xl">Done with this task. Confirm completion?</h1>
      <p className="text-sm">
        Heads up: Task will be permanently deleted upon marking as 'Done'.
      </p> */}

      <aside className="flex items-center justify-center gap-2 p-2">
        <Button className="min-w-[200px]" onClick={handleDelete}>
          Done
        </Button>
        <Button
          className="min-w-[200px]"
          onClick={() => navigate("/")}
          variant="outline"
        >
          Cancel
        </Button>
      </aside>
    </section>
  );
}
