function ContactItem({ name, phone, onDelete }: { name: string; phone: string; onDelete: () => void }) {
  return (
    <li>
      <span>{name} - {phone}</span>
      <button onClick={onDelete}>Eliminar</button>
    </li>
  );
}

export default ContactItem;
