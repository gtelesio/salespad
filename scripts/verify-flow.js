const http = require('http');

function request(options, data) {
    return new Promise((resolve, reject) => {
        const req = http.request(options, res => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => resolve(JSON.parse(body || '{}')));
        });
        req.on('error', reject);
        if (data) req.write(JSON.stringify(data));
        req.end();
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
    const base = { hostname: 'localhost', port: 3000, headers: { 'Content-Type': 'application/json' } };

    console.log('1. Creating Lead...');
    const randomId = Math.floor(Math.random() * 100000);
    const lead = await request({ ...base, path: '/leads', method: 'POST' }, { name: 'Test User', contactInfo: `test${randomId}@example.com` });
    console.log('Lead Created:', lead.id, lead.status);

    if (!lead.id) {
        console.error('Failed to create lead:', lead);
        return;
    }

    console.log('2. Sending Message...');
    const sendRes = await request({ ...base, path: '/leads/send', method: 'POST' }, { leadId: lead.id, message: 'Hello there' });
    console.log('Send Status:', sendRes);

    console.log('Waiting for Queue...');
    await sleep(3000);

    console.log('3. Verifying Contacted Status & Events...');
    let leadCheck = await request({ ...base, path: `/leads/${lead.id}`, method: 'GET' });
    console.log('Status:', leadCheck.status); // Should be 'contacted'
    console.log('Events:', leadCheck.events.map(e => `${e.type}: ${e.content}`));

    console.log('4. Simulating Reply...');
    await request({ ...base, path: '/leads/reply', method: 'POST' }, { leadId: lead.id, content: 'Tell me about pricing' });

    // Wait for async update? No, reply is sync persistence + async processing usually, but here persistence is awaited.
    // Actually, status update is awaited.

    console.log('5. Triggering AI Reply...');
    const aiRes = await request({ ...base, path: '/leads/ai-reply', method: 'POST' }, { leadId: lead.id });
    console.log('AI Reply:', aiRes.reply);

    console.log('Waiting for AI Queue...');
    await sleep(3000);

    console.log('6. Final History Check...');
    const finalLead = await request({ ...base, path: `/leads/${lead.id}`, method: 'GET' });
    console.log('Final Status:', finalLead.status);
    console.log('Total Events:', finalLead.events.map(e => `${e.type}: ${e.content}`));
}

run().catch(console.error);
