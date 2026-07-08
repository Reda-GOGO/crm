import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router"
import { Home, RotateCcw } from "lucide-react"
import { useTranslation } from "react-i18next"
import Back from "@/components/shared/Back"

export default function NotFound() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <Back className="h-full">
      <div className="h-full items-center justify-center bg-background flex flex-col">

        <div className="flex-1 flex h-full flex-col items-center justify-center px-6 text-center">
          <div className="relative select-none mb-10">
            <span
              className="block font-bold leading-none tracking-tighter text-foreground/[0.04]"
              style={{ fontSize: "clamp(140px, 26vw, 240px)" }}
            >
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="block font-bold leading-none tracking-tighter text-foreground"
                style={{ fontSize: "clamp(90px, 17vw, 160px)" }}
              >
                404
              </span>
            </div>
          </div>

          <div className="max-w-sm space-y-2.5 mb-10">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              {t("notFound.pageTitle")}
            </h1>
            <p className="text-muted-foreground text-[15px] leading-relaxed">
              {t("notFound.description")}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Button
              size="lg"
              className="w-full sm:w-auto gap-2 px-6"
              onClick={() => navigate("/")}
            >
              <Home className="w-4 h-4" />
              {t("notFound.goHome")}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto gap-2 px-6"
              onClick={() => navigate(-1)}
            >
              <RotateCcw className="w-4 h-4" />
              {t("notFound.tryAgain")}
            </Button>
          </div>

        </div>

        <div className="px-6 py-4 text-center">
          <p className="text-xs text-muted-foreground/50 font-mono">
            {t("notFound.footer")}
          </p>
        </div>
      </div>
    </Back>
  )
}
