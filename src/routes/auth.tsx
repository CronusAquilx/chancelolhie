import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { usePrefs } from "@/lib/astra/prefs";
import { useAuth } from "@/lib/auth";
import { AstraMark } from "@/components/astra/Mark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useServerFn } from "@tanstack/react-start";
import { devSignIn } from "@/lib/astra/dev-access.functions";
import { AuthPage } from "@/components/astra/AuthPage";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — BirchBlock" },
      { name: "description", content: "Sign in to BirchBlock, your private AI agent." },
      { property: "og:title", content: "Sign in — BirchBlock" },
      { property: "og:description", content: "Sign in to BirchBlock, your private AI agent." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

