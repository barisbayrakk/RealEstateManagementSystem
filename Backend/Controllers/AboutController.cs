using Emlak.API.Data;
using Emlak.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Emlak.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AboutController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AboutController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<AboutInfo>> GetAboutInfo()
        {
            var info = await _context.AboutInfos.FirstOrDefaultAsync();
            if (info == null)
            {
                return NotFound();
            }
            return info;
        }

        [HttpPut]
        public async Task<IActionResult> UpdateAboutInfo(AboutInfo info)
        {
            var existingInfo = await _context.AboutInfos.FirstOrDefaultAsync();
            if (existingInfo == null)
            {
                return NotFound();
            }

            existingInfo.Description = info.Description;
            existingInfo.YearsInBusiness = info.YearsInBusiness;
            existingInfo.OfficeImages = info.OfficeImages;

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
