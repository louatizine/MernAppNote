import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md"; // Import des icônes

const NoteCard = ({ title, date, content, tags, isPinned, onEdit, onDeleted, onPinNote }) => {
  return (
    <div className="border p-4 rounded-md shadow-md bg-white hover:shadow-xl transition-all ease-in-out">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-xs text-slate-500">{date}</span>
        </div>
        <MdOutlinePushPin
          className={`cursor-pointer ${isPinned ? 'text-primary' : 'text-slate-300'}`}  // Correction de la classe dynamique
          onClick={onPinNote}
          title={isPinned ? "Unpin Note" : "Pin Note"} 
        />
      </div>

      <p className="text-xs text-slate-600 mt-2">
        {content?.slice(0, 60)}
        {content && content.length > 60 ? '...' : ''}
      </p>
      <div className="flex justify-between items-center">
        <div className="text-xs text-slate-500">{tags}</div>

        <div className="flex items-center gap-2">
          <MdCreate
            className="icon-btn hover:text-green-500 cursor-pointer"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-btn hover:text-red-500 cursor-pointer"
            onClick={onDeleted}
          />

        </div>
      </div>
    </div>
  );
};

export default NoteCard;
