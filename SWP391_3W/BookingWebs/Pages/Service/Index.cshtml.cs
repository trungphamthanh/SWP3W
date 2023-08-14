using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using BusinessObj.Model;

namespace BookingWebs.Pages.Service
{
    public class IndexModel : PageModel
    {
        private readonly BusinessObj.Model.DASContext _context;

        public IndexModel(BusinessObj.Model.DASContext context)
        {
            _context = context;
        }

        public IList<Daservice> Daservice { get;set; } = default!;

        public async Task OnGetAsync()
        {
            if (_context.Daservices != null)
            {
                Daservice = await _context.Daservices
                .Include(d => d.Account).ToListAsync();
            }
        }
    }
}
