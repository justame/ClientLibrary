using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Newtonsoft.Json.Linq;
using ClientLibrary.UserControls;

namespace ClientLibrary
{
    public partial class Main : Base.Page.BaseMasterPage
    {
        public new void Page_Load(object sender, EventArgs e)
        {
            base.Page_Load(sender, e);

            UpdateDisplayMain();
        }

        private void UpdateDisplayMain()
        {
            JSAdd("Javascript/Main/main.js");
            adminuser a = new adminuser();
            
            AutoCompleteDisplayUpdate();
        }

        private void AutoCompleteDisplayUpdate()
        {
            JSAdd(wucAutoComplete.JSFilePath[0]);
            wucAutoComplete AutoComplete =  wucAutoComplete.AppendTo(dvMain);
            
        }

        protected new void Page_Unload(object sender, EventArgs e)
        {
            base.Page_Unload(sender, e);
        }
    }
}