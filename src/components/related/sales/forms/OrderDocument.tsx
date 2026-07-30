import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Col from "@/components/shared/Col";
import { saleTypes } from "@/constants/Icons";
import { Label } from "@/components/ui/label";



export function OrderDocument() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm"> Order Document</CardTitle>
        <CardDescription>Adjust document information about your sale order</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2 flex-col">
        <Col>
          <Label htmlFor="type" className="text-sm font-medium py-2">
            type
          </Label>
          <div className=" flex flex-wrap gap-2">
            {saleTypes.map((type) => (
              <span key={type.lable} className="flex items-center gap-2 rounded-lg border px-2 py-1.5">
                <type.icon className="w-3 h-3" />
                <span className="text-xs">{type.lable}</span>
              </span>
            ))}
          </div>
        </Col>
      </CardContent>
    </Card>
  );
}
