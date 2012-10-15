using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Newtonsoft.Json.Linq;

namespace ClientLibrary.Base.Page
{
    public partial class BaseMasterPage : Base.Page.BasePage
    {
        private JObject JSVars = new JObject();

        public new void Page_Load(object sender, EventArgs e)
        {
            base.Page_Load(sender, e);

            UpdateDisplayMain();
            
        }

        public void JSAdd(string prmPath)
        {
            Master.JSAdd(prmPath);
        }

        private void UpdateDisplayMain()
        {
            // CSS
            Master.CSSAdd("CSS/Base/reset.css");

            // JS
            Master.JSAdd("Javascript/Base/jquery.1.7.1.js");
            Master.JSAdd("Javascript/Base/mustache.js");
            Master.JSAdd("Javascript/Base/underscore.js");
            Master.JSAdd("Javascript/Base/underscore.string.js");
            Master.JSAdd("Javascript/Base/backbone.js");
            Master.JSAdd("Javascript/Base/core.0.0.1.js");

            // Vars
            JSVarSet("pathRelative", PathRelative);
        }

        public new Base.Master.BaseMaster Master
        {
            get
            {
                return (Base.Master.BaseMaster)base.Master;
            }
        }

        #region Service Functions

        public void JSVarSet(string prmKey, string prmValue)
        {
            JSVars.Add(prmKey, prmValue);
        }
        public void JSVarSet(string prmKey, int prmValue)
        {
            JSVars.Add(prmKey, prmValue);
        }
        public void JSVarSet(string prmKey, JObject prmValue)
        {
            JSVars.Add(prmKey, prmValue);
        }

        #endregion

        private void Page_PreRenderComplete(object sender, EventArgs e)
        {
            RenderControlAliasIDs();
            RenderJSVars();
        }

        private void RenderJSVars()
        {
            Master.JSVarLiteral.Text = JSVars.ToString();
        }

        private void RenderControlAliasIDs()
        {
        }

        protected new void Page_Unload(object sender, EventArgs e)
        {
            base.Page_Unload(sender, e);
        }


    }
}