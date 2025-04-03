import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  badges,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  badges: string[];
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-primary" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="flex-1">
      <p>{description}</p>
    </CardContent>
    <CardFooter className="flex justify-end gap-3 flex-wrap">
      {badges.map((badge, index) => (
        <Badge key={index} variant="secondary">
          {badge}
        </Badge>
      ))}
    </CardFooter>
  </Card>
);

export default FeatureCard;
