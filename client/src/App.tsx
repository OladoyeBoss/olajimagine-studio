import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Home from "./pages/home";
import { SignUp } from "./pages/signup";
import { SignIn } from "./pages/signin";
import { Gallery } from "./pages/gallery";
import { Help } from "./pages/help";
import { Contact } from "./pages/contact";
import NotFound from "./pages/not-found";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/help" component={Help} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;