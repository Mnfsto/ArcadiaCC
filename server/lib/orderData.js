  const orderMessage = order => {
      if (!Array.isArray(order)) {
          console.error("Error: order must be an array.");
          return '';
      }
     const orderHtml = order.map(item =>
          `<tr style="border-bottom: 1px solid #dddddd;">
                <td style="padding: 15px 10px; display: flex; align-items: center;">
                    <img src="${item.imageUrl}" alt="${item.title}" style="width: 65px; height: 65px; margin-right: 15px; border-radius: 8px; border: 1px solid #eee;">
                        <div>
                            <p style="margin: 0; font-size: 16px; font-weight: bold; color: #333;">${item.title}</p>
                            ${item.size ? `<p style="margin: 5px 0 0; font-size: 14px; color: #777;">Размер: ${item.size}</p>` : ''}
                        </div>
                </td>
                <td style="padding: 15px 10px; text-align: center; font-size: 16px;">${item.count} шт.</td>
                <td style="padding: 15px 10px; text-align: right; font-size: 16px; font-weight: bold;">${item.amount} $.</td>
            </tr>`

     ).join('');
     return orderHtml;
    };

const hashOrder = (order) => {
    const date = new Date();
    const itemData =  order.map(item => `${item.count}${item.id}${item.price}`).join('');
    return `${itemData}_${date.toLocaleDateString()}`;
}
  module.exports =  { orderMessage, hashOrder };