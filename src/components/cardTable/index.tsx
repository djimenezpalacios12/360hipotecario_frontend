import React from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import { CardTableProps } from "@/interfaces/cardTable.interfaces";

const CardTable: React.FC<CardTableProps> = ({ children, title }) => {
  return (
    <Card x-chunk="dashboard-07-chunk-1">
      <CardHeader className="flex justify-between">
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          <Separator className="my-4 p-[0.5px] bg-neutral-600 " />
        </CardDescription>
        <CardContent>{children}</CardContent>
      </CardHeader>
    </Card>
  );
};

export default CardTable;
