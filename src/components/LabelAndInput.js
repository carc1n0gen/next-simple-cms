import Form from "react-bootstrap/Form";

export default function LabelAndInput({ id, name, label, type, defaultValue, errors}) {  
  return (
    <div className="mb-3">
      <Form.Label htmlFor={id}>{label}</Form.Label>
      <Form.Control
        type={type}
        id={id}
        name={name}
        defaultValue={defaultValue}
        isInvalid={errors}
      />
      {errors && (
        <Form.Control.Feedback type="invalid">
          {errors}
        </Form.Control.Feedback>
      )}
    </div>
  );
}
