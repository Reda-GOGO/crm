import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Hash, Info, Mail, Phone, Plus, SearchIcon, User, UserPlus } from "lucide-react";
import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Col from "@/components/shared/Col";
import Row from "@/components/shared/Row";

export function Customer() {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <Info className="h-3.5 w-3.5 text-primary" />
          Customer
        </CardTitle>
        <CardDescription>
          Select customer or create new customer for the sale
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 ">
        <Content />
      </CardContent>
    </Card>
  )
}

function Content() {
  return (

    <Tabs defaultValue="create" className="w-full">
      <TabsList className="flex w-full justify-between">
        <TabsTrigger value="create"><UserPlus /> New Customer</TabsTrigger>
        <TabsTrigger value="search"><SearchIcon /> Find Customer</TabsTrigger>
      </TabsList>
      <TabsContent value="create"><Create /></TabsContent>
      <TabsContent value="search"><Find /></TabsContent>
    </Tabs>
  )
}

function Create() {
  return (
    <div>
      <Col>
        <Field>
          <Label className="text-xs font-semibold text-muted-foreground uppercase">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5" />
            <Input
              className="pl-9 h-9 text-sm bg-muted/20"
              placeholder="e.g John Doe" />
          </div>
        </Field>
        <Field>
          <Label className="text-xs font-semibold text-muted-foreground uppercase">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5" />
            <Input
              className="pl-9 h-9 text-sm bg-muted/20"
              placeholder="e.g john@example.com" />
          </div>
        </Field>


        <div className="flex items-center gap-2 py-1">
          <div className="flex-1 h-px bg-border" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/40">
            Optional
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <Field>
          <Label className="text-xs font-semibold text-muted-foreground uppercase">Company</Label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5" />
            <Input
              className="pl-9 h-9 text-sm bg-muted/20"
              placeholder="Acme Inc" />
          </div>
        </Field>

        <Row>

          <Field>
            <Label className="text-xs font-semibold text-muted-foreground uppercase">Phone</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5" />
              <Input
                className="pl-9 h-9 text-sm bg-muted/20"
                placeholder="+(212)6 555-12347" />
            </div>
          </Field>


          <Field>
            <Label className="text-xs font-semibold text-muted-foreground uppercase">Ice</Label>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5" />
              <Input
                className="pl-9 h-9 text-sm bg-muted/20"
                placeholder="00000000" />
            </div>
          </Field>
        </Row>
      </Col>



      <div className="flex w-full justify-center items-center gap-2 pt-6 pb-2">
        <Button variant="default" className="w-full">
          <Plus /> Add Customer
        </Button>
      </div>
    </div>
  )
}


function Find() {
  return (
    <div>
      search customer go here
    </div>
  )
}
