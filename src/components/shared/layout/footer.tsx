import { useTheme } from "@emotion/react";
import Follow from "@/components/shared/follow";
import { cx } from "@emotion/css";
import {
  footerFormButtons,
  footerFormFields,
  footerFormPraise,
  footerFormSuccess,
} from "@/utils/constants";
import Form from "@/components/shared/form";

export default function Footer() {
  const { isDarkMode } = useTheme();

  return (
    <footer className="bottom-0 left-0 right-0 border-white border-t bg-black mt-44 pb-12">
      <div className="container">
        <div
          className={cx(
            {
              "border border-white": isDarkMode,
            },
            "pt-24 px-8 mdx:px-12 relative -top-24 bg-black"
          )}
        >
          <div className="flex flex-wrap items-center gap-10">
            <h4 className="w-full text-white text-[2rem] leading-7 font-medium lg:max-w-sm">
              Subscribe to life-changing messages
            </h4>
            <Form
              buttons={footerFormButtons}
              fields={footerFormFields}
              onSubmit={console.log}
              praise={footerFormPraise}
              successMessage={footerFormSuccess}
              className="flex-1 grid gap-y-5 sm:grid-cols-[3fr_2fr] sm:grid-rows-[auto_auto] sm:[&_.group-button]:row-start-1 sm:[&_.group-button]:row-end-2  sm:[&_.group-button]:col-start-2  sm:[&_.group-button]:col-end-3 sm:[&_.group-message]:col-start-1 sm:[&_.group-message]:col-end-3 [&_button[type=submit]]:bg-white [&_button[type=submit]]:border [&_button[type=submit]]:border-white [&_button[type=submit]]:text-black [&_button[type=submit]_svg_path]:stroke-black"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-4 items-center justify-between [&_p.theme-text]:text-white [&_span.theme-icon-fill_svg_path]:stroke-white [&_span.theme-icon-fill_svg_path]:fill-white">
          <p className="text-white text-base">Copy Right @ 2023</p>
          <Follow />
        </div>
      </div>
    </footer>
  );
}
