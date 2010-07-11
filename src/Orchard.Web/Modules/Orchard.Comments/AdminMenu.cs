﻿using Orchard.Localization;
using Orchard.UI.Navigation;

namespace Orchard.Comments {
    public class AdminMenu : INavigationProvider {
        public Localizer T { get; set; }

        public string MenuName { get { return "admin"; } }

        public void GetNavigation(NavigationBuilder builder) {
            builder.Add(T("Comments"), "3",
                        menu => menu
                                    .Add(T("Manage Comments"), "1.0", item => item.Action("Index", "Admin", new { area = "Orchard.Comments" }).Permission(Permissions.ManageComments))
                                    );
        }
    }
}
