using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ClientLibrary.Base.Master
{
    public partial class BaseMaster : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        #region Properties

        public Literal JSVarLiteral
        {
            get
            {
                return ltrJSVars;
            }
        }

        public new Base.Page.BasePage Page
        {
            get
            {
                return (Base.Page.BasePage)base.Page;
            }
        }

        #endregion

        #region Service Functions

        public void CSSAdd(string prmPath)
        {
            string CSSPath = String.Format("<link href=\"{0}{1}\" type=\"text/css\" rel=\"Stylesheet\" />", Page.PathRelative, prmPath);
            ltrCSS.Text += CSSPath;
        }

        public void JSAdd(string prmPath)
        {
            string JSPath = String.Format("<script src=\"{0}{1}\" type=\"text/javascript\"></script>", Page.PathRelative, prmPath);
            ltrJS.Text += JSPath;
        }

        #endregion
    }
}