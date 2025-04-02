import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Heart,
  DatabaseBackup,
  Proportions,
  Captions,
  MoveRight,
} from 'lucide-react';
import FeatureCard from '@/components/feature-card';

const features = [
  {
    icon: DatabaseBackup,
    title: 'Dynamic Product Management',
    description:
      'Create, delete, and filter products with ease. The application provides intuitive controls for managing your product inventory.',
    badges: ['Add Product', 'Delete', 'Filter', 'Search'],
  },
  {
    icon: Heart,
    title: 'User Interaction',
    description:
      'Toggle favourites and likes for a personalized user experience. Keep track of your preferred products with intuitive controls.',
    badges: ['Favourite', 'Like'],
  },
  {
    icon: Proportions,
    title: 'Responsive Design',
    description:
      'Ensures optimal viewing across various devices. The application adapts to different screen sizes for the best user experience.',
    badges: ['Desktop', 'Tablet', 'Mobile'],
  },
  {
    icon: Captions,
    title: 'Form integration',
    description:
      'Make form validation and handle form create products. View toast notification and redirect to products page.',
    badges: ['React Hook Form', 'Zod validation'],
  },
];

const technologies = [
  {
    title: 'Next.js',
    description: 'For server-side rendering and seamless navigation.',
  },
  {
    title: 'Zustand',
    description: 'Lightweight state management for React applications.',
  },
  {
    title: 'Tailwind CSS',
    description: 'Utility-first CSS framework for styling.',
  },
  {
    title: 'Shadcn UI',
    description: 'Component library for building UI components.',
  },
  {
    title: 'TypeScript',
    description: 'For type safety and enhanced development experience.',
  },
];

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          Alfa Test Project
        </h1>
        <p className="text-xl text-muted-foreground">
          A Next.js application for product management with Zustand state
          manager.
        </p>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Project Overview</CardTitle>
            <CardDescription>About this demonstration project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              This project is a demonstration of a Next.js application designed
              to manage and display a list of products. It showcases my ability
              to integrate modern web technologies and implement efficient state
              management using Zustand.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/products">
              <Button size="lg">
                Go to products list <MoveRight />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Key Features</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map(({ icon, title, description, badges }) => (
            <FeatureCard
              key={title}
              icon={icon}
              title={title}
              description={description}
              badges={badges}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Technologies Used</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {technologies.map(({ title, description }) => (
            <Card key={title}>
              <CardHeader>
                <CardTitle>
                  <h3 className="text-lg font-semibold mb-2">{title}</h3>
                </CardTitle>
                <CardDescription>
                  <p className="text-muted-foreground text-sm mb-4">
                    {description}
                  </p>
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Installation</h2>
        <Card>
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">1. Clone the repository:</h3>
                <div className="bg-muted p-3 rounded-md">
                  <code className="text-sm">
                    git clone https://github.com/agapovk/alfa-test.git
                  </code>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">
                  2. Navigate to the project directory:
                </h3>
                <div className="bg-muted p-3 rounded-md">
                  <code className="text-sm">cd alfa-test</code>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">3. Install dependencies:</h3>
                <div className="bg-muted p-3 rounded-md">
                  <code className="text-sm">npm install</code>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">
                  4. Run the development server:
                </h3>
                <div className="bg-muted p-3 rounded-md">
                  <code className="text-sm">npm run dev</code>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="https://github.com/agapovk/alfa-test" target="_blank">
                View on GitHub
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}
