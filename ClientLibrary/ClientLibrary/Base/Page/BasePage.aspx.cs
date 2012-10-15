using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ClientLibrary.Handle;
using Newtonsoft.Json.Linq;

namespace ClientLibrary.Base.Page
{
    public partial class BasePage : System.Web.UI.Page
    {
        public string PathRelative = clsGlobal.RelativePath;

        protected void Page_Load(object sender, EventArgs e)
        {
            
        }

       
        protected void Page_Unload(object sender, EventArgs e)
        {

        }
    }
}