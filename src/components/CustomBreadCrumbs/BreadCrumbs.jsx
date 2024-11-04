import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { APP_ROUTES } from "../../data/models/appRoute"

const matchRoute = (routePath, locationPath) => {
  const routeParts = routePath.split("/").filter(Boolean);
  const locationParts = locationPath.split("/").filter(Boolean);

  if (routeParts.length !== locationParts.length) {
    return false;
  }

  return routeParts.every((part, i) => {
    return part.startsWith(":") || part === locationParts[i];
  });
};

const buildBreadcrumb = (currentPath) => {
  const matchedRoute = APP_ROUTES.find((route) =>
    matchRoute(route.path, currentPath)
  );

  if (!matchedRoute) return [];

  let breadcrumbs = [matchedRoute.meta.breadcrumb[0]];
  let parentLabel = matchedRoute.meta.breadcrumb[0].parent;

  while (parentLabel) {
    const parentRoute = APP_ROUTES.find((route) =>
      route.meta.breadcrumb.some((crumb) => crumb.label === parentLabel)
    );

    if (parentRoute) {
      const parentBreadcrumb = parentRoute.meta.breadcrumb[0];
      if (!breadcrumbs.find((b) => b.label === parentBreadcrumb.label)) {
        breadcrumbs.unshift(parentBreadcrumb);
      }
      parentLabel = parentBreadcrumb.parent;
    } else {
      parentLabel = null;
    }
  }

  return breadcrumbs;
};

const AppBreadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const breadcrumbs = buildBreadcrumb(location.pathname);

  return (
    <div className="route-bar p-4 ml-4 mt-4">
      <Breadcrumbs radius="lg" variant="bordered">

        {breadcrumbs.map((crumb, index) => (
          <BreadcrumbItem
            key={crumb.label}
            isCurrent={index === breadcrumbs.length - 1}
            onPress={() =>
              navigate(
                APP_ROUTES.find((route) =>
                  route.meta.breadcrumb.some((b) => b.label === crumb.label)
                )?.path || "/"
              )
            }
            color="foreground"
          >
            {crumb.label}
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>
    </div>
  );
};

export default AppBreadcrumb;