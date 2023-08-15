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
    public class DeleteModel : PageModel
    {
        private readonly BusinessObj.Model.DASContext _context;

        public DeleteModel(BusinessObj.Model.DASContext context)
        {
            _context = context;
        }

        [BindProperty]
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

        public async Task<IActionResult> OnPostAsync(int? id)
        {
            if (id == null || _context.Daservices == null)
            {
                return NotFound();
            }
            var daservice = await _context.Daservices.FindAsync(id);

            if (daservice != null)
            {
                Daservice = daservice;
                _context.Daservices.Remove(Daservice);
                await _context.SaveChangesAsync();
            }

            return RedirectToPage("./Index");
        }
    }
}
