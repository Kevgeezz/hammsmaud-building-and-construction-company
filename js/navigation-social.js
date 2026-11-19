(() => {
  const iconPaths = {
    facebook:
      "M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5Z",
    tiktok:
      "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.08 2.7 1.58 4.19 1.66v4.03c-1.4-.05-2.8-.34-4.06-.94-.55-.25-1.06-.57-1.56-.9-.01 2.77.01 5.54-.02 8.31-.07 1.33-.51 2.65-1.28 3.74-1.24 1.82-3.39 3.01-5.6 3.05-1.36.08-2.72-.29-3.87-.99-1.9-1.14-3.2-3.22-3.39-5.43-.02-.5-.03-1-.01-1.49.17-1.79 1.06-3.5 2.45-4.64 1.58-1.34 3.79-1.98 5.83-1.6.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.12 1.05-1.28 1.79-.14.34-.1.72-.09 1.08.24 1.65 1.83 3.04 3.53 2.89 1.13-.01 2.2-.68 2.78-1.65.19-.33.4-.67.41-1.06.1-1.78.06-3.56.07-5.34.01-4.01-.01-8.02.02-12.03Z",
  };
  const svgNamespace = "http://www.w3.org/2000/svg";

  document
    .querySelectorAll(
      ".site-navigation-note + .site-navigation-social, .site-navigation-note .site-navigation-social",
    )
    .forEach((social) => {
      if (social.dataset.footerStyleApplied) {
        return;
      }

      const note = social.closest(".site-navigation-note");
      if (!note) {
        return;
      }

      const links = Array.from(social.querySelectorAll("a"));
      const footerLinks = document.createElement("span");
      footerLinks.className = "footer-social-links";
      footerLinks.setAttribute("role", "group");
      footerLinks.setAttribute("aria-label", "Social media");

      links.forEach((link) => {
        const platform = (link.getAttribute("aria-label") || "").toLowerCase();
        if (!iconPaths[platform]) {
          return;
        }

        link.className = `footer-social-button footer-social-button--${platform}`;
        link.replaceChildren();

        const icon = document.createElement("span");
        icon.className = "footer-social-icon";
        icon.setAttribute("aria-hidden", "true");

        const svg = document.createElementNS(svgNamespace, "svg");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("aria-hidden", "true");
        const path = document.createElementNS(svgNamespace, "path");
        path.setAttribute("d", iconPaths[platform]);
        svg.append(path);
        icon.append(svg);

        const label = document.createElement("span");
        label.className = "footer-social-text";
        label.textContent = platform === "tiktok" ? "TikTok" : "Facebook";

        const action = document.createElement("span");
        action.className = "footer-social-action";
        action.textContent = "Connect";

        link.append(icon, label, action);
        footerLinks.append(link);
      });

      social.className = "site-navigation-social";
      social.dataset.footerStyleApplied = "true";
      social.replaceChildren(footerLinks);
      social.setAttribute("role", "group");
      social.setAttribute("aria-label", "Social media");
      note.after(social);
    });
})();
