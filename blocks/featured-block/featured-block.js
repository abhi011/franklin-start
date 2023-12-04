export default function decorate(block) {
  block.firstElementChild.classList.add('featured-block-wrapper')
  const cols = [...block.firstElementChild.children];
  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('featured-block__image-wrapper');
          if(picWrapper.nextElementSibling) {
            picWrapper.nextElementSibling.classList.add('featured-block__text-wrapper');
          } else if(picWrapper.previousElementSibling) {
            picWrapper.previousElementSibling.classList.add('featured-block__text-wrapper');
          }
        }
      }
    });
  });
}