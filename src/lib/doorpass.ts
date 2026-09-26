'use server';

import { cookies } from 'next/headers';

const DOORPASS_COOKIE_NAME = 'admin_doorpass_unlocked';

export async function revokeDoorpassAction() {
  const cookieStore = await cookies();
  cookieStore.delete(DOORPASS_COOKIE_NAME);
  return { success: true };
}

export async function setDoorpassUnlockedAction() {
  const cookieStore = await cookies();
  cookieStore.set(DOORPASS_COOKIE_NAME, 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
  return { success: true };
}
