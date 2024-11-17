export const covertDate = (date: string) => new Date(date)
    .toLocaleDateString('zh-CN', {
        year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', hour12: false,
    });
