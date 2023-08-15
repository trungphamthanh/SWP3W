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
    public class DetailsModel : PageModel
    {
        private readonly BusinessObj.Model.DASContext _context;

        public DetailsModel(BusinessObj.Model.DASContext context)
        {
            _context = context;
        }

      public Daservice Daservice { get; set; } = default!; 

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null || _context.Daservices == null)
            {
                return NotFound();
            }

            var daservice = await _context.Daservices.FirstOrDefaultAsync(m => m.Id == id);
            if (daservice == null)
            {
                return NotFound();
            }
            else 
            {
                Daservice = daservice;
            }
            return Page();
        }
    }
}
