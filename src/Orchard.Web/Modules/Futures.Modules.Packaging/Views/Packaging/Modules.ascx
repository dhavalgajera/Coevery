﻿<%@ Control Language="C#" Inherits="Orchard.Mvc.ViewUserControl<Futures.Modules.Packaging.ViewModels.PackagingModulesViewModel>" %>
<%@ Import Namespace="Orchard.Mvc.Html" %>
<h1>
    <%: Html.TitleForPage(T("Packaging").ToString(), T("Browse Packages").ToString())%></h1>
    <%: Html.Partial("_Subnav") %>

<p><%:Html.ActionLink("Update List", "Update") %></p>
<ul>
    <%foreach (var item in Model.Modules) {%><li><a href="<%:item.PackageStreamUri%>">
        <%:item.SyndicationItem.Title.Text%></a> [<%:Html.ActionLink("Install", "Install", new RouteValueDictionary {{"SyndicationId",item.SyndicationItem.Id}})%>]
        </li><%
      }%></ul>
