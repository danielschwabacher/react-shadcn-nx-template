import { Alert, AlertDescription, AlertTitle } from "@/shared-components/alert";

export function App() {
  return (
    <>
      {/* Alert Section */}
      <Alert className="border-green-200 bg-green-50">
        <AlertTitle className="text-green-800">Setup Complete!</AlertTitle>
        <AlertDescription className="text-green-700">
          If you can see this, the NX monorepo with Tailwind CSS and shadcn/ui
          is working!
        </AlertDescription>
      </Alert>
    </>
  );
}

export default App;
