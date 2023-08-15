using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using BusinessObj.Model;

namespace BookingWebs.Pages.Service
{
    public class CreateModel : PageModel
    {
        private readonly BusinessObj.Model.DASContext _context;

        public CreateModel(BusinessObj.Model.DASContext context)
        {
            _context = context;
        }

        public IActionResult OnGet()
        {
        ViewData["AccountId"] = new SelectList(_context.Accounts, "Id", "Id");
            return Page();
        }

        [BindProperty]
        public Daservice Daservice { get; set; } = default!;
        

        // To protect from overposting attacks, see https://aka.ms/RazorPagesCRUD
        public async Task<IActionResult> OnPostAsync()
        {
          if (!ModelState.IsValid || _context.Daservices == null || Daservice == null)
            {
                return Page();
            }

            _context.Daservices.Add(Daservice);
            await _context.SaveChangesAsync();

            return RedirectToPage("./Index");
        }
    }
}
