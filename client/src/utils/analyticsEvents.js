import { trackEvent } from "../hooks/useGoogleAnalytics";

// Pre-defined events for consistent tracking
export const AnalyticsEvents = {
  CONTACT_FORM_SUBMIT: "contact_form_submit",
  CONTACT_FORM_SUCCESS: "contact_form_success",
  CONTACT_FORM_ERROR: "contact_form_error",
  BLOG_POST_VIEW: "blog_post_view",
  GALLERY_IMAGE_VIEW: "gallery_image_view",
  ADMIN_LOGIN: "admin_login",
  ADMIN_LOGOUT: "admin_logout",
};

// Helper functions for common events
export const trackContactFormSubmit = (formType) => {
  trackEvent(AnalyticsEvents.CONTACT_FORM_SUBMIT, "Forms", formType);
};

export const trackContactFormSuccess = (formType) => {
  trackEvent(AnalyticsEvents.CONTACT_FORM_SUCCESS, "Forms", formType);
};

export const trackBlogView = (postTitle) => {
  trackEvent(AnalyticsEvents.BLOG_POST_VIEW, "Blog", postTitle);
};

export const trackAdminLogin = (userRole) => {
  trackEvent(AnalyticsEvents.ADMIN_LOGIN, "Authentication", userRole);
};
