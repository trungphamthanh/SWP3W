using DASBackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DASBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SlotController : ControllerBase
    {
        private readonly DASDbContext _DASDbContext;
        public SlotController(DASDbContext DASDbContext)
        {

            this._DASDbContext = DASDbContext;

        }

        [HttpGet]
        [Route("GetAllSlotByDoctorId/{id}")]
        public async Task<ActionResult<IEnumerable<Slot>>> GetAllSlotByDoctorId(int id)
        {
            if (_DASDbContext.Slot == null)
            {
                return BadRequest(new { Message = "Can not get slots of doctor " });
            }
            var slots = await _DASDbContext.Slot.Where(x => x.accountId == id).ToListAsync();
            if (slots == null)
            {
                return BadRequest(new { Message = "Can not get slots of doctor " });
            }
            return Ok(slots);

        }


        [HttpPost]
        [Route("AddDoctorToSlot")]
        public async Task<Slot> AddDoctor(Slot objSlot)
        {
            _DASDbContext.Slot.Add(objSlot);
            await _DASDbContext.SaveChangesAsync();
            return objSlot;
        }

    }
}
