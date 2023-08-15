using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using BusinessObj.Model;

namespace BookingWebs.Pages.Service
{
    public class EditModel : PageModel
    {
        private readonly BusinessObj.Model.DASContext _context;

        public EditModel(BusinessObj.Model.DASContext context)
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

            var daservice =  await _context.Daservices.FirstOrDefaultAsync(m => m.Id == id);
            if (daservice == null)
            {
                return NotFound();
            }
            Daservice = daservice;
           ViewData["AccountId"] = new SelectList(_context.Accounts, "Id", "Id");
            return Page();
        }

        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see https://aka.ms/RazorPagesCRUD.
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _context.Attach(Daservice).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DaserviceExists(Daservice.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return RedirectToPage("./Index");
        }

        private bool DaserviceExists(int id)
        {
          return (_context.Daservices?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
