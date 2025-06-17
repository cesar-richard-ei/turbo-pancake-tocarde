export function updateUser(data: Record<string, any>, id: number) {
  return fetch(`/api/user/users/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': (document.cookie.match(/csrftoken=([^;]+)/)?.[1] ?? '')
    }
  });
}
