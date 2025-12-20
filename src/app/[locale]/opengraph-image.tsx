import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'د. صبري أبو قرون - مرشد طبي';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 128,
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    fontFamily: 'Arial, sans-serif',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                    }}
                >
                    <div
                        style={{
                            fontSize: 80,
                            fontWeight: 'bold',
                            color: 'white',
                            marginBottom: 20,
                        }}
                    >
                        د. صبري أبو قرون
                    </div>
                    <div
                        style={{
                            fontSize: 40,
                            color: '#5eead4',
                            fontWeight: 'normal',
                        }}
                    >
                        مرشد طبي - فن ربط المعلومات
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
