using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using BusinessObj.Models;

namespace BookingWebs.Pages.Bookings
{
    public class IndexModel : PageModel
    {
        private readonly BusinessObj.Models.DASContext _context;

        public IndexModel(BusinessObj.Models.DASContext context)
        {
            _context = context;
        }

        public IList<Booking> Booking { get;set; } = default!;

        public async Task OnGetAsync()
        {
            if (_context.Bookings != null)
            {
                Booking = await _context.Bookings
                .Include(b => b.Account)
                .Include(b => b.Slot).ToListAsync();
            }
        }
    }
}
