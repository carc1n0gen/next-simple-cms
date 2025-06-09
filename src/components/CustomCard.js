import { Card, CardBody, CardFooter, CardHeader } from "react-bootstrap";

export default function CustomCard({ className, children: parts, ...rest }) {
  return (
    <Card className={`shadow-lg ${className}`} style={{minWidth: "500px"}} {...rest}>
      {parts.header && (
        <CardHeader className="border-0 rounded bg-white pt-5 px-5">
          {parts.header}
        </CardHeader>
      )}
      {parts.body && (
        <CardBody className="pt-4 pb-5 px-5">
          {parts.body}
        </CardBody>
      )}
      {parts.footer && (
        <CardFooter className="text-center border-0 rounded-bottom p-4">
          {parts.footer}
        </CardFooter>
      )}
    </Card>
  );
}
