
import { Card, CardContent } from "@/components/ui-custom/Card";
import { AddOn } from "./types";

interface AddOnCardProps {
  addon: AddOn;
}

const AddOnCard = ({ addon }: AddOnCardProps) => {
  return (
    <Card className="border shadow-subtle hover:shadow-hover transition-all">
      <CardContent className="p-5">
        <h4 className="font-medium mb-1">{addon.name}</h4>
        <p className="text-sm text-muted-foreground mb-3">{addon.description}</p>
        <p className="font-medium text-primary">{addon.price}</p>
      </CardContent>
    </Card>
  );
};

export default AddOnCard;
