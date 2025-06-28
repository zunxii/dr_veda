export async function uploadForOCR(file: File): Promise<string> {
  const form = new FormData();
  form.append('file', file);

  const res = await fetch('/api/ocr', {
    method: 'POST',
    body: form,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'OCR failed');
  return data.text;
}
