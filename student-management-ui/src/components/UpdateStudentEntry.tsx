interface Props {
  name: string;
  value: string;
  label: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
}

function UpdateStudentEntry(props: Props) {
  return (
    <div className='w-9/12'>
      <label className='block'>{props.label}</label>
      <div className='flex justify-between'>
        <input
          className='border bg-my-white font-light'
          placeholder={props.value}
          value={props.value}
          onChange={(e) => props.handleChange(e, props.name)}
        />
      </div>
    </div>
  );
}

export default UpdateStudentEntry;
