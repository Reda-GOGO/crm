import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber, stringfyPrice } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { useSaleFormReturnType } from "@/hooks/forms/useSaleForm";
import { Price } from "@/components/shared/Price";


export function Payment({ form }: { form: useSaleFormReturnType }) {

  const totalAmount = form.lines.totalAmount;
  const totalTax = totalAmount * 0.2;
  const totalWithTax = totalAmount + totalTax;
  const totalProfit = form.lines.totalProfit;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm"> Payment Summary</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-2 flex-col">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Subtotal (3 items)</span>
          <Price value={formatNumber(totalAmount)} />
        </div>

        <div className="flex flex-col space-y-1">
          <Label htmlFor="discount" className="text-sm font-medium py-2">
            Discount (MAD)
          </Label>
          <Input
            id="discount"
            type="number"
            min={0}
            disabled
            placeholder="Enter discount amount"
          />
        </div>

        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Tax (20%)</span>
          <Price value={formatNumber(totalTax)} />
        </div>

        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Profit</span>
          <Price value={formatNumber(totalProfit)} />
        </div>

        <div className="border-t pt-4 flex justify-between items-center font-medium text-base">
          <span>Total</span>
          <Price value={formatNumber(totalWithTax)} />
        </div>

        <div className="flex flex-col space-y-1 pt-4">
          <Label className="text-sm font-medium">
            Total Amount in French Words
          </Label>
          <div className="p-2 border rounded-md bg-muted text-sm text-muted-foreground leading-relaxed">
            {stringfyPrice(totalWithTax)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
