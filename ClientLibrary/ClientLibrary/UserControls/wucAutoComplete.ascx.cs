using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ClientLibrary.UserControls
{
    public partial class wucAutoComplete : System.Web.UI.UserControl
    {
        public static wucAutoComplete Get(Page prmControl)
        {
            wucAutoComplete Control = (wucAutoComplete)prmControl.LoadControl("~/UserControls/wucAutoComplete.ascx");
            return Control;
        }

        public static wucAutoComplete AppendTo(Control prmControl)
        {
            wucAutoComplete Control = Get(prmControl.Page);
            prmControl.Controls.Add(Control);
            return Control;
        }

        public static List<string> JSFilePath = new List<string>()
        {
            "UserControls/Javascript/uc-auto-complete.js"
        };

        public void DisplaySet()
        {
            
        }
    }
}