import { Card, CardBody, CardFooter, CardHeader } from "react-bootstrap";

export default function AuthForm({ action, children: parts }) {
  return (
    <Card as={"form"} action={action} className="shadow-lg" style={{width: "500px"}}>
      <CardHeader className="border-0 rounded bg-white pt-5 px-5">
        {parts.header}
      </CardHeader>
      <CardBody className="pt-4 pb-5 px-5">
        {parts.body}
      </CardBody>
      <CardFooter className="text-center border-0 rounded-bottom p-4">
        {parts.footer}
      </CardFooter>
    </Card>
  );
}